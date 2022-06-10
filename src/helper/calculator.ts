import { Person } from '../interfaces';

const RANGE_SLOTS = Math.pow(2, 12);

export const calculateNewLastPosition = (lastPosition: number): number => {
  return lastPosition + RANGE_SLOTS;
}

export const calculateDividePosition = (prePosition: number, nextPostion: number): number => {
  return prePosition + ((nextPostion - prePosition) / 2)
}

export const calculatePosition = (prePosition?: number, nextPostion?: number): number => {
  if (!prePosition && !nextPostion) {
    return RANGE_SLOTS;
  }

  if (!prePosition) {
    return calculateDividePosition(0, nextPostion!)
  }

  if (!nextPostion) {
    return calculateNewLastPosition(prePosition!);
  }

  return calculateDividePosition(prePosition!, nextPostion!);

  // TODO: if the calculated position equals to 1 or prePosition or nextPosition,
  // we need to reset the position of the list
}

export const reorder = (list: Iterable<Person> | ArrayLike<Person>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};