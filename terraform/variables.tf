variable "region" {
  type = string
  default = "us-west-2"
}

variable "vpc_name" {
  type = string
  default = "my-vpc"
}

variable "vpc_cidr" {
  type = string
  default = "10.0.0.0/16"
}

variable "availability_zones" {
  type = list(string)
  default = ["us-west-2a", "us-west-2b"]
}

variable "cluster_name" {
  type = string
  default = "my-cluster"
}
