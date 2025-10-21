import React from "react";

interface TicketingWidgetProps {
  mode: string;
  id: string;
}

const TicketingWidget = ({ mode, id }: TicketingWidgetProps) => {
  console.log("Ticketing Widget Loaded with mode:", mode, "and id:", id);
  return <div>Ticketing Widget Bla Bla Black Sheep!!!</div>;
};

export default TicketingWidget;
