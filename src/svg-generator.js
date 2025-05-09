import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prettier from "prettier";

const CURRENT_PATH = fileURLToPath(import.meta.url);
const CURRENT_DIR_PATH = path.dirname(CURRENT_PATH);

const SVGS_DIR_PATH = path.join(CURRENT_DIR_PATH, "svgs");
const COMPONENTS_DIR_PATH = path.join(CURRENT_DIR_PATH, "components");

const formatComponentName = (fileName) => {
  return path.basename(fileName, ".svg");
};

const formatSvgContent = (svgContent) => {
  return svgContent.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
};

const formatWithPrettier = async (content, parser = "typescript") => {
  return await prettier.format(content, { parser });
};

const createComponentTemplate = (componentName, svgContent) => `
  import type { SVGProps } from 'react';
  import { Ref, forwardRef } from 'react';

  const ${componentName} = (
    {
      size = 24,
      ...props
    }: SVGProps<SVGSVGElement> & {
      size?: number | string,
    },
    ref: Ref<SVGSVGElement>
  ) => (
    ${formatSvgContent(svgContent)}
  );

  const ForwardRef = forwardRef(${componentName});
  export default ForwardRef;
`;

const clearComponentsDirectory = async () => {
  try {
    try {
      await fs.access(COMPONENTS_DIR_PATH);
    } catch {
      await fs.mkdir(COMPONENTS_DIR_PATH);
      return;
    }

    const files = await fs.readdir(COMPONENTS_DIR_PATH);

    await Promise.all(
      files.map((file) => fs.unlink(path.join(COMPONENTS_DIR_PATH, file)))
    );
  } catch (error) {
    console.error("components 폴더 초기화 중 오류 발생:", error);
    throw error;
  }
};

const generateSvgToReactComp = async () => {
  try {
    const svgFiles = (await fs.readdir(SVGS_DIR_PATH)).filter((file) =>
      file.endsWith(".svg")
    );

    const components = [];

    for (const svgFile of svgFiles) {
      const componentName = formatComponentName(svgFile);
      components.push(componentName);

      const svgFilePath = path.resolve(SVGS_DIR_PATH, svgFile);
      const svgContent = (await fs.readFile(svgFilePath)).toString();
      const componentContent = createComponentTemplate(
        componentName,
        svgContent
      );
      const formattedContent = await formatWithPrettier(componentContent);

      const componentFilePath = path.resolve(
        COMPONENTS_DIR_PATH,
        `${componentName}.tsx`
      );

      await fs.writeFile(componentFilePath, formattedContent);
    }

    return components;
  } catch (error) {
    console.error("SVG 컴포넌트 생성 중 오류 발생:", error);
    throw error;
  }
};

const generateIndexFile = async (components) => {
  try {
    const entryFilePath = path.join(COMPONENTS_DIR_PATH, "index.ts");
    const entryFileContent = components
      .map(
        (component) =>
          `export { default as ${component} } from "./${component}.tsx";`
      )
      .join("\n");

    const formattedContent = await formatWithPrettier(entryFileContent);
    await fs.writeFile(entryFilePath, formattedContent);
  } catch (error) {
    console.error("index.ts 파일 생성 중 오류 발생:", error);
    throw error;
  }
};

(async () => {
  try {
    console.log("SVG 컴포넌트 생성 시작~");
    await clearComponentsDirectory();
    const components = await generateSvgToReactComp();
    await generateIndexFile(components);
    console.log("SVG 컴포넌트 생성 완료~");
  } catch (error) {
    console.error("프로세스 실행 중 오류 발생:", error);
    process.exit(1);
  }
})();
