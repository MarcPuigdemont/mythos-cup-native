import { documentDirectory, getInfoAsync, makeDirectoryAsync, moveAsync } from 'expo-file-system';

export const dirHome = `${documentDirectory}mythos-cup`;

export const dirPicutures = `${dirHome}/Pictures`;

export const moveAttachment = async (sourceFilePath, newFileDir, newFileName) => {
  return new Promise((resolve, reject) => {
    getInfoAsync(newFileDir)
    .then(info => {
      console.log(info);
      if (!info.exists) {
        return makeDirectoryAsync(newFileDir, { intermediates: true });
      }
    })
    .then(() => {
      moveAsync({ from: sourceFilePath, to: `${newFileDir}/${newFileName}` })
        .then(() => {
          console.log('FILE MOVED', sourceFilePath, `${newFileDir}/${newFileName}`);
          resolve(true);
        })
        .catch(error => {
          console.log('moveFile error', error);
          reject(error);
        });
    }) 
    .catch(err => {
      console.log('An error occurred', err);
      reject(err);
    });
  });
};
