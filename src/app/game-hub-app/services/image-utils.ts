export function getCroppedImageUrl(imageUrl: string): string {
  if(imageUrl)
    return imageUrl.replace('/media/', '/media/crop/600/400/');

  return '';
  }