import fs from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';

const dirPath = path.resolve('./public/teleiosis-audio-teachings');

async function getAudioFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(await getAudioFiles(filePath));
    } else if (filePath.match(/\.(mp3|m4a|wav|ogg)$/i)) {
      results.push(filePath);
    }
  }
  return results;
}

async function extract() {
  console.log("Locating audio files...");
  const files = await getAudioFiles(dirPath);
  console.log(`Found ${files.length} audio files. Extracting metadata...`);
  
  const metadataList = [];
  
  for (const file of files) {
    try {
      const metadata = await parseFile(file);
      metadataList.push({
        file: path.relative(dirPath, file).replace(/\\/g, '/'),
        title: metadata.common.title,
        artist: metadata.common.artist,
        album: metadata.common.album,
        year: metadata.common.year,
        durationSeconds: metadata.format.duration,
        bitrate: metadata.format.bitrate,
        sizeBytes: fs.statSync(file).size
      });
    } catch (e) {
      console.error(`Error parsing ${file}:`, e.message);
      metadataList.push({
        file: path.relative(dirPath, file).replace(/\\/g, '/'),
        error: e.message
      });
    }
  }

  const outputPath = path.resolve('./public/teleiosis-audio-teachings/audio_metadata.json');
  fs.writeFileSync(outputPath, JSON.stringify(metadataList, null, 2));
  console.log(`Extraction complete. Metadata saved to ${outputPath}`);
}

extract();
