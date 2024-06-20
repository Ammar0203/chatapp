export const useWidth = (width) => (percent) => ((width > 450 ? 450 : width) * percent) / 100;
export const useHeight = (height) => (percent) => ((height < 600 ? 600 : height) * percent) / 100;
export const totalSize = num => (Math.sqrt((height * height) + (width * width)) * num) / 100;