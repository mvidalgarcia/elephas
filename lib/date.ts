import format from "date-fns/format";
import addDays from "date-fns/addDays";
import nextFriday from "date-fns/nextFriday";
import parseISO from "date-fns/parseISO";

const WEEK_LENGTH = 7;
const API_DATE_FORMAT = "dd/MM/yyyy";

type Weekend = {
  friday: string;
  sunday: string;
};

/**
 * Gets a list of the next `count` weekends, starting from today.
 * For this particular function, a weekend is considered a Friday-Sunday tuple.
 * @param {{count: number}} params.count Number of weekends to retrieve.
 * @returns {Array<Weekend>} List containing the desired weekends.
 */
export function getNextWeekends({
  count = 1,
}: { count?: number } = {}): Array<Weekend> {
  const fridayObj = nextFriday(new Date());
  return [...Array(count).keys()].map((el) => ({
    friday: format(addDays(fridayObj, el * WEEK_LENGTH), API_DATE_FORMAT),
    sunday: format(addDays(fridayObj, 2 + el * WEEK_LENGTH), API_DATE_FORMAT),
  }));
}

export function formatDate(date: string): string {
  return format(parseISO(date), API_DATE_FORMAT);
}
