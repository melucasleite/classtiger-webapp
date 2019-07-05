import moment from "moment";

const sampleLectures = [
  {
    id: 1,
    dayOfWeek: 1,
    start: moment()
      .hour(14)
      .minute(30)
      .format("HH:mm"),
    end: moment()
      .hour(17)
      .minute(0)
      .format("HH:mm"),
    capacity: 7,
    students: 2
  },
  {
    id: 2,
    dayOfWeek: 2,
    start: moment()
      .hour(14)
      .minute(30)
      .format("HH:mm"),
    end: moment()
      .hour(17)
      .minute(0)
      .format("HH:mm"),
    capacity: 7,
    students: 5
  },
  {
    id: 3,
    dayOfWeek: 1,
    start: moment()
      .hour(8)
      .minute(30)
      .format("HH:mm"),
    end: moment()
      .hour(10)
      .minute(0)
      .format("HH:mm"),
    capacity: 7,
    students: 0
  },
  {
    id: 4,
    dayOfWeek: 1,
    start: moment()
      .hour(14)
      .minute(30)
      .format("HH:mm"),
    end: moment()
      .hour(17)
      .minute(0)
      .format("HH:mm"),
    capacity: 7,
    students: 0
  }
];

export default sampleLectures;
