import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

export default function ContributeForm({ address }) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(address);
    setLoading(true);
    setErrorMessage("");

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          placeholder="Amount in ether"
          labelPosition="right"
        />
      </Form.Field>

      <Message error header="Oops!" content={errorMessage} />
      <Button loading={loading} primary>
        Contribute!
      </Button>
    </Form>
  );
}
