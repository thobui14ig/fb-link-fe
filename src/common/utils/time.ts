import dayjs from 'dayjs'

const showDate = (date: Date | null | undefined) => {
    return date ? dayjs(date).format('DD-MM-YYYY HH:mm:ss') : ''
}

const showMinute = (date: Date | null | undefined) => {
    return date ? dayjs(date).minute() : 0
}

export { showDate, showMinute }
