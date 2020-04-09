// tslint:disable-next-line: no-any
export function stringifyObj(events: any) {
  const str =
    Object.entries(events)
      .reduce((a, e) => {
        if (Array.isArray(e[1])) {
          for (const elem of e[1]) {
            a += stringifyObj(elem);
          }
        } else if (typeof e[1] === "object") {
          a += stringifyObj(e[1]);
        } else if (typeof e[1] !== "function" && e[1] !== undefined) {
          if (e[0] === "num" || e[0] === "null") {
            a += `"${e[0]}":${e[1]},`;
          } else {
            a += `"${e[0]}":"${e[1]}",`;
          }
        }
        return a;
      }, "`{")
      .slice(1, -1) + "}";
  return str;
}
