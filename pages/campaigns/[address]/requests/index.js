import React from "react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { useRouter } from "next/router";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

export default function RequestIndex({
  requests,
  requestCount,
  address,
  approversCount,
}) {
  const allRequest = JSON.parse(requests);

  const renderRows = () => {
    return allRequest.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          address={address}
          request={request}
          approversCount={approversCount}
        />
      );
    });
  };

  const router = useRouter();

  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <Layout>
      <h3>Requests list</h3>
      <Link href={`${router.asPath}/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requestCount} request(s)</div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { address } = context.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return {
    props: {
      address: address,
      requests: JSON.stringify(requests),
      requestCount: requestCount,
      approversCount: approversCount,
    },
  };
}
