export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
    const { name, email, message } = req.body;
  
    // do something (store in Firestore, email yourself, etc.)
    console.log({ name, email, message });
  
    res.status(200).send('✅ Thanks for your feedback!');
  }
  