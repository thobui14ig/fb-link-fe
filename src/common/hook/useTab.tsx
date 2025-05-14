
function useTab() {
    const curentTab = location.pathname.replace('/', '')

    const active = (tab: string) => {
        if (tab === curentTab) {
            return "show active"
        }

        return ""
    }

    return { active }
}

export default useTab