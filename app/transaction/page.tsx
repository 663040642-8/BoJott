import { useRouter } from "next/router";
import { useState } from "react";

export default function TransactionPage() {
      const router = useRouter();
      const [description, setDescription] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
    return (
        <div>Hello Transaction</div>
    )
}