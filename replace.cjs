const fs = require('fs');

let code = fs.readFileSync('src/pages/Playground.tsx', 'utf-8');
const startTag = '      {/* Main Content */}';
const endTag = '      {/* Modals for Flow */}';

const startIdx = code.indexOf(startTag);
const endIdx = code.indexOf(endTag);

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {playgroundType === 'chat_completion' && <ChatTemplate model={currentModel} />}
          {playgroundType === 'text_to_image' && <TextToImageTemplate model={currentModel} />}
          {playgroundType === 'image_to_image' && <ImageToImageTemplate model={currentModel} />}
          {playgroundType === 'text_to_video' && <TextToVideoTemplate model={currentModel} />}
          {playgroundType === 'image_to_video' && <ImageToVideoTemplate model={currentModel} />}
          {playgroundType === 'text_to_speech' && <TextToSpeechTemplate model={currentModel} />}
        </div>
        <PlaygroundHistory 
          history={history} 
          onSelect={(item) => {
            setModality(item.modality);
            setPrompt(item.prompt);
            setOutput(item.result);
          }} 
        />
      </div>

`;
  
  code = code.slice(0, startIdx) + replacement + code.slice(endIdx);
  fs.writeFileSync('src/pages/Playground.tsx', code);
  console.log('Successfully replaced lines!');
} else {
  console.log('Tags not found.');
}
