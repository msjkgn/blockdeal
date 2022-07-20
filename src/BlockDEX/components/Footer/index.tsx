import Section from '../Section'

export const Footer = () => {
  return (
    <Section title={null}>
      <div className="uk-flex uk-flex-column uk-flex-middle">
        <div className="uk-divider-small" />
        <div className="uk-flex uk-flex-column uk-width-1-1 uk-text-center">
          <div className="uk-flex uk-flex-row uk-flex-wrap uk-flex-around">
            <div className="uk-flex uk-flex-column uk-padding">
              <div className="uk-h4 uk-text-white uk-margin-remove-bottom" style={{ fontFamily: 'BaronNeue-Black' }}>
                COLLECTIVE
              </div>
              <a className="uk-link-muted uk-text-white" target="_blank" rel="noreferrer">
                <div>Investors</div>
              </a>
              <a className="uk-link-muted uk-text-white" target="_blank" rel="noreferrer">
                <div>Developers</div>
              </a>
            </div>
            <div className="uk-flex uk-flex-column uk-padding">
              <div className="uk-h4 uk-text-white uk-margin-remove-bottom" style={{ fontFamily: 'BaronNeue-Black' }}>
                CONTACT
              </div>
              <a className="uk-link-muted uk-text-white" target="_blank" rel="noreferrer">
                <div>support@blockdex.app</div>
              </a>
            </div>
            <div className="uk-flex uk-flex-column uk-padding">
              <div className="uk-h4 uk-text-white uk-margin-remove-bottom" style={{ fontFamily: 'BaronNeue-Black' }}>
                SOCIAL
              </div>
              <a
                className="uk-link-muted uk-text-white"
                href={`https://discord.gg/DvUjFbbW5K`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="uk-text-cabin">Discord</div>
              </a>
              <a
                className="uk-link-muted uk-text-white"
                href={'https://twitter.com/RememberNFT'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="uk-text-cabin">Twitter</div>
              </a>
              <a
                className="uk-link-muted uk-text-white"
                href={`https://www.instagram.com/remember.nft`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="uk-text-cabin">Instagram</div>
              </a>
              <a
                className="uk-link-muted uk-text-white"
                href="https://medium.com/@remember.nft"
                target="_blank"
                rel="noreferrer"
              >
                <div className="uk-text-cabin">Medium</div>
              </a>
            </div>
          </div>
          <div className="uk-flex uk-flex-column uk-margin-large-top">
            <div className="uk-text-white" style={{ margin: 'auto', fontSize: '12px' }}>
              Copyright © 2022 BLOCKDEX. All Rights Reserved.
            </div>
            <div className="uk-text-white" style={{ margin: 'auto', fontSize: '12px' }}>
              Disclaimer
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Footer
