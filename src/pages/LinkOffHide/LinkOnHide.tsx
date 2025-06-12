import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { ELink } from '@/common/model/link'
import LinkComponent from '@/components/Link/LinkComponent'

function LinkOffHide() {
  const { active } = useTab()

  return (
    <div
      className={`tab-pane fade ${active(Tab.LINK_OFF_HIDE)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <LinkComponent type={ELink.LINK_OFF_HIDE} />
    </div>
  )
}

export default LinkOffHide
