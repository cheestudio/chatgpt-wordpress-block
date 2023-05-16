/* Imports
========================================================= */
import { useCallback, useMemo } from '@wordpress/element';
import { Button, TextareaControl } from '@wordpress/components';


/* Function
========================================================= */
export default function FormInput({ newQuestion, setNewQuestion, generateResponse }) {

  /* Form Handler */

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    generateResponse(newQuestion);
    setNewQuestion("");
  }, [setNewQuestion, generateResponse]);

  /* Render */

  return (
    <form>

      <TextareaControl
        type="text"
        rows={5}
        onChange={(input) => setNewQuestion(input)}
        placeholder="What do you need help with?"
      />

      <Button
        onClick={handleSubmit}
        variant="primary"
      >
        Ask ChatGPT
      </Button>

    </form>
  )

}