import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Phone, MessageCircle, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/button"; // Using button as placeholder if input not found, but I should check if input exists

const categories = ["All", "Food", "Clothes", "Cosmetics", "Jewelry"];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products, isLoading } = trpc.products.search.useQuery({
    category: selectedCategory === "All" ? undefined : selectedCategory,
    query: searchQuery || undefined,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Our Collection</h1>
          <p className="text-muted-foreground">Discover essential products across all categories</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-accent text-accent-foreground" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-muted animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border">
              <div className="aspect-square relative overflow-hidden bg-muted">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                )}
                <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                  {product.category}
                </Badge>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl font-serif">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold text-foreground">₹{product.price}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 flex gap-2">
                <Button className="flex-1 gap-2 bg-accent hover:bg-accent/90">
                  <ShoppingCart size={16} />
                  Add
                </Button>
                <a href={`https://wa.me/9906515680?text=I'm interested in ${product.name}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <MessageCircle size={18} className="text-green-600" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-muted-foreground">No products found in this category.</p>
          <Button variant="link" onClick={() => {setSelectedCategory("All"); setSearchQuery("");}} className="mt-4">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
