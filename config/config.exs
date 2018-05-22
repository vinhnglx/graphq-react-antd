# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :graphql_example,
  ecto_repos: [GraphqlExample.Repo]

# Configures the endpoint
config :graphql_example, GraphqlExampleWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ed/W6bDHnLNTuRkCIyviYH2LRxX2fK366hO2Y3XtbsNAxjmAKLV8GOU217xvzinM",
  render_errors: [view: GraphqlExampleWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: GraphqlExample.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
