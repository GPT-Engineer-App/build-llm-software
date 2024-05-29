import React, { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Spinner } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResponse(data.text);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Ask GPT-3</Text>
        <Input placeholder="Type your question here..." value={input} onChange={handleInputChange} />
        <Button leftIcon={<FaRocket />} colorScheme="teal" onClick={handleSubmit} isLoading={loading}>
          Submit
        </Button>
        {loading ? (
          <Spinner />
        ) : (
          <Box p={4} borderWidth="1px" borderRadius="lg" w="100%">
            <Text>{response}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
