import {
  CoreExtension,
  WebTrFontFace,
  SdfTrFontFace,
  type Stage,
} from "@lightningjs/renderer/core";

const basePath = import.meta.env.BASE_URL;

export default class AppCoreExtension extends CoreExtension {
  async run(stage: Stage) {
    // stage.fontManager.addFontFace(
    //   new WebTrFontFace({
    //     fontFamily: "NotoSans",
    //     descriptors: {},
    //     fontUrl: basePath + "fonts/NotoSans-Regular.ttf",
    //     metrics: {
    //       ascender: 1069,
    //       descender: -293,
    //       lineGap: 0,
    //       unitsPerEm: 1000
    //     }
    //   }),
    // );
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Ubuntu',
          descriptors: {
            weight: 700,
          },
          atlasDataUrl: basePath + 'fonts/Ubuntu-Bold.msdf.json',
          atlasUrl: basePath + 'fonts/Ubuntu-Bold.msdf.png',
          stage,
        }
      ),
    );
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        'msdf',
        {
          fontFamily: 'Ubuntu',
          descriptors: {
            weight: 400,
          },
          atlasDataUrl: basePath + 'fonts/Ubuntu-Regular.msdf.json',
          atlasUrl: basePath + 'fonts/Ubuntu-Regular.msdf.png',
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
          atlasDataUrl: basePath + 'fonts/Ubuntu-Regular.msdf.json',
          atlasUrl: basePath + 'fonts/Ubuntu-Regular.msdf.png',
          stage,
        }
      ),
    );
  }
}
