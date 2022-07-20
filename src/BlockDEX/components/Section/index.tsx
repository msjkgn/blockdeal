import React from 'react'

type SectionProps = {
  title: string | React.ReactNode | null
  children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="uk-section uk-section-xsmall">
      <div className="uk-container uk-container-small">
        <div className="uk-padding-small">
          <div className="uk-text-center">
            {title ? <div className="uk-h2 uk-margin-small-bottom uk-text-bold">{title}</div> : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Section
