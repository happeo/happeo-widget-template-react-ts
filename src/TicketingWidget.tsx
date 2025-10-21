import React from "react";

interface TicketingWidgetProps {
  mode: string;
  id: string;
}

const TicketingWidget = ({ mode, id }: TicketingWidgetProps) => {
  console.log("Ticketing Widget Loaded with mode:", mode, "and id:", id);
  return <div>Ticketing Widget Bla Bla Black Sheep!!555!</div>;
};

export default TicketingWidget;
