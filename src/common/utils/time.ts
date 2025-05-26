import dayjs from 'dayjs'

const showDate = (date: Date | null | undefined) => {
    if (!date) return ""
    return date ? dayjs(date).format('DD-MM-YYYY HH:mm:ss') : ''
}

const showMinute = (targetTimeString: Date | null | undefined) => {
    if (!targetTimeString) return ""
    const pastTime = dayjs(targetTimeString)
    const now = dayjs()
    const diffInMinutes = now.diff(pastTime, 'minute')

    return diffInMinutes
}

export { showDate, showMinute }
