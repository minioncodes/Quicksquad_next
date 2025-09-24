const fs = require("fs");
const path = "c:/Users/Hp/Desktop/Office/quicksquad_next/src/app/page.tsx";
let text = fs.readFileSync(path, "utf8");
function replaceOnce(oldStr, newStr) {
  if (!text.includes(oldStr)) {
    throw new Error(`Missing: ${oldStr}`);
  }
  text = text.replace(oldStr, newStr);
}
replaceOnce('className="bg-gradient-to-b from-blue-500 to-blue-300 text-white h-screen flex items-center"', 'className="bg-gradient-to-b from-blue-500 to-blue-300 text-white py-16 sm:py-20 md:py-24 flex items-center md:min-h-[70vh]"');
replaceOnce('className="container mx-auto grid md:grid-cols-2 gap-8 px-4 sm:px-6"', 'className="container mx-auto grid md:grid-cols-2 gap-6 md:gap-10 px-4 sm:px-6"');
replaceOnce('className="text-4xl md:text-6xl font-bold mb-6 leading-tight"', 'className="text-3xl md:text-5xl font-bold mb-4 leading-tight md:leading-[1.15]"');
replaceOnce('className="text-lg mb-6 text-gray-100 max-w-lg"', 'className="text-base md:text-lg mb-5 text-gray-100 max-w-lg"');
replaceOnce('className="space-x-4"', 'className="flex flex-wrap items-center gap-3"');
text = text.replace(/We\u2019re/g, "We're");
fs.writeFileSync(path, text);
