import { Messages } from "primereact/messages";
import { useEffect, useRef } from "react";
import useFetchFavorites from "../../api/useFetchFavorite";
import ContactCard from "../ListContacts/ContactCard";
import Loading from "../Loading";

const ListFavorites = () => {
  const { data: favorites, error, isLoading: loading } = useFetchFavorites();
  const msgs = useRef<Messages | null>(null);

  console.log(favorites);

  useEffect(() => {
    if (error && msgs.current) {
      msgs.current.clear();
      msgs.current.show({
        sticky: true,
        severity: "error",
        summary: "Error",
        detail: error?.message,
        closable: false,
      });
    }
  }, [error]);

  return (
    <>
      <Messages ref={msgs} />
      {loading ? (
        <Loading size={"medium"} />
      ) : (
        <ul>
          {favorites?.map((contact) => {
            return <ContactCard contact={contact} />;
          })}
        </ul>
      )}
    </>
  );
};

export default ListFavorites;
