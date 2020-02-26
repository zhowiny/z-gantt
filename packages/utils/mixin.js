import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export default {
  methods: {
    isToday (date) {
      return this.dayjs().isSame(date, 'day')
    },
    // isHoliday (date) {
    //   return [0, 6].includes(date.day()) // || date.isSame(this.dayjs('2019-9-30'), 'day')
    // },
    dayjs,
  },
}
