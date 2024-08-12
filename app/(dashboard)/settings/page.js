import SetApprover from "./SetApprover";

async function fetchApprovers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/approvers`);
  const approvers = await res.json();
  return approvers;
}

export default async function Settings() {
  const approvers = await fetchApprovers();
  return <SetApprover approvers={approvers} />;
}
