import { useState } from "react";

import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </>
  );
}

export default App;
