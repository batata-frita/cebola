provider "digitalocean" {
  token = "${var.do_token}"
}

resource "digitalocean_floating_ip" "cebola" {
  droplet_id = "${digitalocean_droplet.cebola.id}"
  region = "${digitalocean_droplet.cebola.region}"
}

resource "template_file" "user-data" {
  template = "${file("./cloud-config.yaml")}"
}

resource "digitalocean_droplet" "cebola" {
  image = "coreos-stable"
  name = "cebola"
  region = "nyc2"
  size = "1gb"
  ssh_keys = [15143, 4185859, 4185867]
  ipv6 = true
  private_networking = true

  user_data = "${template_file.user-data.rendered}"
}

output "floating_ip" {
  value = "${digitalocean_floating_ip.cebola.ip_address}"
}

output "droplet_ip" {
  value = "${digitalocean_droplet.cebola.ipv4_address}"
}
