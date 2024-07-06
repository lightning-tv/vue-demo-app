import {
  SdfTrFontFace,
  type Stage,
} from "@lightningjs/renderer";

const basePath = import.meta.env.BASE_URL;

export default function loadFonts(stage: Stage) {
  
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Roboto',
          descriptors: {
            weight: 700,
          },
          atlasDataUrl: basePath + 'fonts/Roboto-Bold.msdf.json',
          atlasUrl: basePath + 'fonts/Roboto-Bold.msdf.png',
          stage,
        }
      ),
    );
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Roboto',
          descriptors: {
            weight: 400,
          },
          atlasDataUrl: basePath + 'fonts/Roboto-Regular.msdf.json',
          atlasUrl: basePath + 'fonts/Roboto-Regular.msdf.png',
          stage,
        }
      ),
    );

    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Arial',
          descriptors: {
            weight: 500,
          },
          atlasDataUrl: basePath + 'fonts/Roboto-Regular.msdf.json',
          atlasUrl: basePath + 'fonts/Roboto-Regular.msdf.png',
          stage,
        }
      ),
    );
}
