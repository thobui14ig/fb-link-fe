import { Tab } from "@/common/constant"
import useTab from "@/common/hook/useTab"
import LinkComponent from "@/components/Link/LinkComponent"
import { ELink } from "@/common/model/link"

function LinkOn() {
    const { active } = useTab()

    return (
        <div className={`tab-pane fade ${active(Tab.LINK_ON)}`} id="pills-linksOn" role="tabpanel" aria-labelledby="pills-linksOn-tab">
            <LinkComponent type={ELink.LINK_ON} />
        </div>
    )
}

export default LinkOn