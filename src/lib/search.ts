import type { PortalViewModel } from "@/lib/types";

type SearchParams = {
  query: string;
  ministryId: string;
  tag: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function levenshteinDistance(left: string, right: string) {
  if (left === right) {
    return 0;
  }
  if (left.length === 0) {
    return right.length;
  }
  if (right.length === 0) {
    return left.length;
  }

  const matrix = Array.from({ length: left.length + 1 }, () =>
    new Array<number>(right.length + 1).fill(0),
  );

  for (let row = 0; row <= left.length; row += 1) {
    matrix[row][0] = row;
  }

  for (let col = 0; col <= right.length; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row <= left.length; row += 1) {
    for (let col = 1; col <= right.length; col += 1) {
      const cost = left[row - 1] === right[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }

  return matrix[left.length][right.length];
}

function isFuzzyMatch(term: string, token: string) {
  if (token.includes(term)) {
    return true;
  }

  const maxDistance = term.length <= 4 ? 1 : 2;
  return levenshteinDistance(term, token) <= maxDistance;
}

export function matchesSearch(portal: PortalViewModel, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return true;
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const searchableText = normalize(
    `${portal.title} ${portal.description} ${portal.ministryName} ${portal.tags.join(" ")}`,
  );
  const tokens = searchableText.split(/[\s,./-]+/).filter(Boolean);

  return terms.every((term) =>
    tokens.some((token) => isFuzzyMatch(term, token) || token.startsWith(term)),
  );
}

export function filterPortals(
  portals: PortalViewModel[],
  params: SearchParams,
) {
  return portals.filter((portal) => {
    if (params.ministryId && portal.ministryId !== params.ministryId) {
      return false;
    }
    if (params.tag && !portal.tags.includes(params.tag)) {
      return false;
    }
    return matchesSearch(portal, params.query);
  });
}
