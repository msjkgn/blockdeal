import Section from 'BlockDEX/components/Section'

export const Introduction = () => {
  return (
    <>
      <Section title={<span style={{ fontFamily: 'BaronNeue-Black' }}>The future of decentralized OTC</span>}>
        <div className="uk-grid uk-grid-match uk-child-width-1-2@m">
          <div>
            <div className="uk-padding-small">
              <div className="uk-h4 uk-margin-top">High Volume Trade</div>
              <div className="uk-p uk-margin-remove-top">
                Cryptocurrencies are the highest appreciating asset class in the history of mankind. Bitcoin’s price
                appreciated 6,500,000x in 12 years, from $0.01 to $65,000.
              </div>
            </div>
          </div>
          <div>
            <div className="uk-padding-small">
              <div className="uk-h4 uk-margin-top">1INCH Integration</div>
              <div className="uk-p uk-margin-remove-top">
                More than 300,000 BTC in over 30,000 addresses minted their own HEX for free using the HEX contract. HEX
                is the first cryptocurrency with a chart of its future locked supply.
              </div>
            </div>
          </div>
          <div>
            <div className="uk-padding-small">
              <div className="uk-h4 uk-margin-top">Lowest fee/gas</div>
              <div className="uk-p uk-margin-remove-top">
                Stakers get paid rewards daily. This multiplies their ROI when HEX’s price appreciates against USD.
                Active Stakes also receive penalties of other users 40%.
              </div>
            </div>
          </div>
          <div>
            <div className="uk-padding-small">
              <div className="uk-h4 uk-margin-top">No LP with Instant Trade</div>
              <div className="uk-p uk-margin-remove-top">
                Stakers get paid rewards daily. This multiplies their ROI when HEX’s price appreciates against USD.
                Active Stakes also receive penalties of other users 40%.
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section
        title={
          <>
            <span style={{ fontFamily: 'BaronNeue-Black' }}>About BLOCKDEX</span>
          </>
        }
      >
        <div className="uk-grid uk-grid-match uk-child-width-1-4@m">
          <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
            <div
              className="uk-text-center uk-margin-remove-bottom"
              style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
            >
              $2B
            </div>
            <div className="uk-h6 uk-text-center uk-margin-remove">Highest Volume</div>
          </div>
          <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
            <div
              className="uk-text-center uk-margin-remove-bottom"
              style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
            >
              $23B
            </div>
            <div className="uk-h6 uk-text-center uk-margin-remove">Total Trade Volume</div>
          </div>
          <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
            <div
              className="uk-text-center uk-margin-remove-bottom"
              style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
            >
              $0.1B
            </div>
            <div className="uk-h6 uk-text-center uk-margin-remove">Stake Volume</div>
          </div>
          <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
            <div
              className="uk-text-center uk-margin-remove-bottom"
              style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
            >
              13
            </div>
            <div className="uk-h6 uk-text-center uk-margin-remove">Investors</div>
          </div>
          <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
            <div
              className="uk-text-center uk-margin-remove-bottom"
              style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
            >
              32
            </div>
            <div className="uk-h6 uk-text-center uk-margin-remove">Exchanges</div>
          </div>
          <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
            <div
              className="uk-text-center uk-margin-remove-bottom"
              style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
            >
              8,230,211
            </div>
            <div className="uk-h6 uk-text-center uk-margin-remove">Holders</div>
          </div>
          <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
            <div
              className="uk-text-center uk-margin-remove-bottom"
              style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
            >
              73 Days
            </div>
            <div className="uk-h6 uk-text-center uk-margin-remove">Average double time</div>
          </div>
          <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
            <div
              className="uk-text-center uk-margin-remove-bottom"
              style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
            >
              6.6 yrs
            </div>
            <div className="uk-h6 uk-text-center uk-margin-remove">Average stake length</div>
          </div>
        </div>
      </Section>
    </>
  )
}
