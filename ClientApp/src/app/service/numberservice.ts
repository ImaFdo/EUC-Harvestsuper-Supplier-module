import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class Numberservice {
  private lastSequenceNumber = 0;

  constructor() {
  }

  generateNumber(prefix: string) {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    this.lastSequenceNumber++;
    const sequenceNumber = ('0000' + this.lastSequenceNumber).slice(-4);
    return `${prefix}-${year}${month}${day}-${sequenceNumber}`;

  }

  setLastSequenceNumber(invoiceNumber: string) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + currentDate.getDate()).slice(-2);

    const year = invoiceNumber.slice(3, 7);
    const month = invoiceNumber.slice(7, 9);
    const day = invoiceNumber.slice(9, 11);
    const sequenceNumberStr = invoiceNumber.slice(-4);
    const sequenceNumber = parseInt(sequenceNumberStr, 10);

    if (year === currentYear.toString() && month === currentMonth && day === currentDay && !isNaN(sequenceNumber)) {
      this.lastSequenceNumber = sequenceNumber;
    } else {
      this.lastSequenceNumber = 0;
    }

  }

}


