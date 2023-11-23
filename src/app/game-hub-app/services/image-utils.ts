export function getCroppedImageUrl(imageUrl: string): string {
    return imageUrl.replace('/media/', '/media/crop/600/400/');
  }