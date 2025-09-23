import React from 'react'

interface BannerTextProps {
  title: string
  titleStrong: string
  description: string
}

export const BannerText = ({ title, titleStrong, description }: BannerTextProps ) => {
  return (
    <div className='banner-text'>
        <h2 className='title'>{ title }<strong>{ titleStrong }</strong></h2>
        <p>{ description }</p>
    </div>
  )
}
