import release from "@/lib/release.json"

const date = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" })

/**
 * The chart releases lembosproj/deploy has published, newest first, from lib/release.json — which
 * tools/release.mjs writes before every build, so the table is as current as the site.
 */
export function Releases() {
  return (
    <table>
      <thead>
        <tr>
          <th>Chart</th>
          <th>Installs Lembos</th>
          <th>Published</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {release.releases.map((r) => (
          <tr key={r.chart}>
            <td>
              <code>{r.chart}</code>
            </td>
            <td>
              <code>{r.platform}</code>
            </td>
            <td>{date.format(new Date(r.publishedAt))}</td>
            <td>
              <a href={r.url}>v{r.chart}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
