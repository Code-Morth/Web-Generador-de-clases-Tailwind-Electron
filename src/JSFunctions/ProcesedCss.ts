import TailwindClass from "../TailwindClass.json";

const ProcesedCss = (data: any) => {
  const regex = /className="([^"]*)"/g;

  const classesArray: string[] = [];
  let match;

  while ((match = regex.exec(data)) !== null) {
    const classes: string[] = match[1].split(' ');

    // Filtrar clases que no sean de Tailwind CSS
    const nonTailwindClasses = classes.filter(className => !TailwindClass.includes(className.trim()));

    classesArray.push(...nonTailwindClasses);
  }

  let cssText = ' ';

  classesArray.forEach((className) => {
    if (className.trim() !== '') {
      cssText += `.${className.trim()} {\n`;
      cssText += `  @apply visible ;\n\n`;
      cssText += `  @screen tablet {\n`;
      cssText += `    @apply visible ;\n`;
      cssText += `  }\n\n`;
      cssText += `  @screen laptop {\n`;
      cssText += `    @apply visible ;\n`;
      cssText += `  }\n`;
      cssText += `}\n\n`;
    }
  });

  return cssText;
};

export default ProcesedCss;
