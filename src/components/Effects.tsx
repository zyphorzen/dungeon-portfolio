import { Vector2 } from "three";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { isLowEnd, noFx } from "../utils/device";

const CA_OFFSET = new Vector2(0.0007, 0.0007);

export default function Effects() {
  if (noFx) return null;

  return (
    <EffectComposer multisampling={isLowEnd ? 0 : 4} enableNormalPass={false}>
      <Bloom
        mipmapBlur
        luminanceThreshold={0.55}
        luminanceSmoothing={0.25}
        intensity={isLowEnd ? 0.6 : 0.9}
        radius={0.7}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      {isLowEnd ? (
        <></>
      ) : (
        <ChromaticAberration
          offset={CA_OFFSET}
          radialModulation={false}
          modulationOffset={0}
        />
      )}
      {isLowEnd ? (
        <></>
      ) : (
        <Noise
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
          opacity={0.4}
        />
      )}
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
    </EffectComposer>
  );
}
