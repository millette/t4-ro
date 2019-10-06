'use strict'

// core
const { readFileSync, writeFileSync, readdirSync } = require("fs")

// npm
const remark = require("remark")
const select = require("unist-util-select")

const fix = ({ url, title, children }) => {
  if (url.indexOf("/custom/")) return
  const obj = { page: url.slice(8) }
  if (title) obj.title = title
  const text = children[0] && children[0].type === "text" && children[0].value
  if (text) obj.text = text
  return obj
}

const getLinks = (cnt) => select
  .selectAll("link", remark.parse(cnt))
  .map(fix)
  .filter(Boolean)

const stuffs = []

const read = (fn) => stuffs.push({
  page: fn.slice(0, -4),
  links: getLinks(readFileSync(`pages/custom/${fn}`))
})

const isMdx = (source) => source.split(".").slice(-1)[0] === "mdx"

const output = (source) => ({
  source,
  href: `/custom/${source.slice(0, -4)}`,
})

const makeBacklinks = () => {
  const rev = new Map()

  stuffs.forEach(({ page, links }) => {
    links.forEach((link) => {
      // const k = (rev.get(link.page) || []).slice()
      const k = rev.get(link.page)
      if (k) {
        k.push({ page, text: link.text })
        rev.set(link.page, k)
      } else {
        rev.set(link.page, [{ page, text: link.text }])
      }
    })
  })

  return Array.from(rev).map(([page, backlinks]) => ({ page, backlinks }))
}

const merge = () => {
  const ret = new Map()

  stuffs.forEach(({ page, links }) => ret.set(page, { links, backlinks: [] }))
  const bl = makeBacklinks()

  bl.forEach(({ page, backlinks }) => {
    // const k = (ret.get(page) || []).slice()
    const k = ret.get(page)
    ret.set(page, k ? { ...k, backlinks } : { links: [], backlinks })
  })

  return Array.from(ret).map(([ page, { links, backlinks }]) => {
    const ret2 = {
      page,
      links,
      backlinks
    }

    if (!links || !links.length) ret2.deadEnd = true
    if (!backlinks || !backlinks.length) ret2.orphan = true

    return ret2
  })
}

readdirSync("pages/custom/").filter(isMdx).map(output).forEach(({ source }) => read(source))
// console.log(JSON.stringify(merge()))
writeFileSync("sitepaths.json", JSON.stringify(merge()))

