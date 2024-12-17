import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, ArrowRight } from "lucide-react";

export default function DestinationCard({ destination, onEdit, onDelete, onClick }) {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(destination);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(destination.id);
  };

  return (
    <Card
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onClick(destination)}
    >
      <div className="relative h-48">
        <img
          src={`http://localhost:5120${destination.imageUrl}`}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 hover:scale-105"
            onClick={handleEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8 hover:scale-105"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{destination.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <StatsBox label="Hotels" value={destination.hotels?.length || 0} />
          <StatsBox label="Activities" value={destination.activities?.length || 0} />
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

const StatsBox = ({ label, value }) => (
  <div className="bg-muted/50 rounded-lg p-3 text-center">
    <span className="text-2xl font-bold block">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);
