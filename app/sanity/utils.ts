import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { sanityClient } from './client'

const { dataset, projectId } = sanityClient.config()

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}