defmodule GraphQL.Schema do
  use Absinthe.Schema
  alias GraphQL.Resolvers

  query do
    field(:health, :string, resolve: fn _, _ -> {:ok, "up"} end)
  end
end
