import { formatDistanceToNow } from 'date-fns';

export const getCreatedAgo = (createdDate) =>
  `created ${formatDistanceToNow(createdDate, {
    includeSeconds: true,
  })} ago`;
