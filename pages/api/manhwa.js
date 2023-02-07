// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    fetch("https://jankquin.github.io/api/manhwa.json")
        .then((doc) => doc.json())
        .then((doc) => res.status(200).json(doc))
}
