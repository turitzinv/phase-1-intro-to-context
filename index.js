// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  let record = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
  return record
}

function createEmployeeRecords(array) {
  let newRecord = []
  for (let i = 0; i < array.length; i++) {
    newRecord.push(createEmployeeRecord(array[i]))
  }
  return newRecord
}

function createTimeInEvent(record, dateStamp) {
  let newTimeIn = {
    type: 'TimeIn',
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  }
  record.timeInEvents.push(newTimeIn)
  return record
}

function createTimeOutEvent(record, dateStamp) {
  let newTimeOut = {
    type: 'TimeOut',
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  }
  record.timeOutEvents.push(newTimeOut)
  return record
}

function hoursWorkedOnDate(record, dateStamp) {
  for (let i = 0; i < record.timeInEvents.length; i++) {
    if (dateStamp === record.timeInEvents[i].date) {
      let time = record.timeOutEvents[i].hour - record.timeInEvents[i].hour
      return time / 100
    }
  }
}

function wagesEarnedOnDate(record, dateStamp) {
  let wagesEarned = hoursWorkedOnDate(record, dateStamp) * record.payPerHour
  return wagesEarned
}

function allWagesFor(record) {
  let wageTotal = 0
  let timeInArray = []
  record.timeInEvents.forEach(element => {
    timeInArray.push(element.date)
  })
  console.log(timeInArray)
  for (let i = 0; i < timeInArray.length; i++) {
    let wagesPerDate = wagesEarnedOnDate(record, timeInArray[i])
    wageTotal += wagesPerDate
  }
  return wageTotal;
}

function calculatePayroll(employeeArray) {
  let allWagesTotal = 0
  employeeArray.forEach(element => {
    let wagesPerEmployee = allWagesFor(element)
    allWagesTotal += wagesPerEmployee
  })
  return allWagesTotal
}