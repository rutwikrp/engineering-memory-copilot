import cognee


class CogneeService:

    async def remember_document(
        self,
        dataset_name: str,
        file_path: str,
    ):

        return await cognee.remember(
            data=file_path,
            dataset_name=dataset_name,
        )

    async def chat(
        self,
        dataset_name: str,
        session_id: str,
        question: str,
    ) -> str:

        # Store user question in session memory
        await cognee.remember(
            data=question,
            session_id=session_id,
        )

        # Query permanent memory + session memory
        results = await cognee.recall(
            query_text=question,
            datasets=[dataset_name],
            session_id=session_id,
        )

        if not results:
            answer = "I couldn't find any relevant information."

        else:

            parts = []

            for result in results:

                if hasattr(result, "text"):
                    parts.append(result.text)

                elif isinstance(result, dict):
                    parts.append(result.get("text", ""))

                else:
                    parts.append(str(result))

            answer = "\n".join(parts)

        # Store assistant answer in session memory
        await cognee.remember(
            data=answer,
            session_id=session_id,
        )

        return answer

    async def forget_dataset(
        self,
        dataset_name: str,
    ):

        return await cognee.forget(
            dataset=dataset_name,
        )

    async def improve_dataset(
        self,
        dataset_name: str,
    ):

        return await cognee.improve(
            dataset=dataset_name,
        )


cognee_service = CogneeService()