// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.from("Test").insert([{ value: inputValue }]);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Value saved to Supabase!");
      setInputValue("");
    }
    setLoading(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Hello!</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        <input
          type="text"
          className="mt-6 px-4 py-2 border rounded"
          placeholder="Enter something..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSubmit}
          disabled={loading || !inputValue}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {message && <div className="mt-4 text-green-600">{message}</div>}
      </div>
    </div>
  );
};

export default Index;
